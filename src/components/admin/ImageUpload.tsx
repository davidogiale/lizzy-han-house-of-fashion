
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  onImageRemoved?: () => void;
}

export function ImageUpload({ onImageUploaded, currentImageUrl, onImageRemoved }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadToSupabase = async (file: File) => {
    console.log('Uploading to Supabase storage:', file.name);
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File) => {
    console.log('Starting file upload for:', file.name);

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToSupabase(file);
      console.log('Upload successful, URL:', imageUrl);
      onImageUploaded(imageUrl);
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Product Image</Label>
      
      {currentImageUrl && (
        <div className="relative inline-block">
          <img 
            src={currentImageUrl} 
            alt="Product preview" 
            className="w-32 h-32 object-cover rounded-lg border"
          />
          {onImageRemoved && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-none p-0"
              onClick={onImageRemoved}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}

      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
          ${uploading ? 'opacity-50 pointer-events-none' : 'hover:border-primary hover:bg-primary/5'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Uploading image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop an image here, or click to select
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('image-upload')?.click()}
              disabled={uploading}
            >
              Select Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
