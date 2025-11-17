import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();
    
    if (!reference) {
      console.error('No reference provided');
      return new Response(JSON.stringify({ error: 'No reference provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Verifying payment status for reference:', reference);

    // Verify transaction with Paystack API
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!paystackResponse.ok) {
      const errorText = await paystackResponse.text();
      console.error('Paystack API error:', errorText);
      
      return new Response(JSON.stringify({ 
        error: 'Transaction not found on Paystack',
        message: 'This order was not processed through Paystack or the reference is invalid.',
        statusCode: paystackResponse.status
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const paystackData = await paystackResponse.json();
    console.log('Paystack verification response:', paystackData);

    if (!paystackData.status) {
      throw new Error(paystackData.message || 'Failed to verify transaction');
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Determine order status based on Paystack response
    let orderStatus = 'pending';
    const transactionStatus = paystackData.data.status;

    if (transactionStatus === 'success') {
      orderStatus = 'processing';
    } else if (transactionStatus === 'failed') {
      orderStatus = 'failed';
    } else if (transactionStatus === 'abandoned') {
      orderStatus = 'cancelled';
    }

    console.log(`Updating order ${reference} to status: ${orderStatus}`);

    // Update order status in database
    const { data, error } = await supabaseClient
      .from('orders')
      .update({ 
        status: orderStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', reference)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }

    console.log(`Order ${reference} updated successfully to ${orderStatus}`);

    return new Response(JSON.stringify({ 
      success: true, 
      status: orderStatus,
      order: data
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in paystack-verify-status function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
