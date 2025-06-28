
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');
const PAYSTACK_API_URL = 'https://api.paystack.co/transaction/initialize';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { amount, email, currency, reference } = await req.json();

    if (!amount || !email || !currency) {
      return new Response(JSON.stringify({ error: 'Amount, email, and currency are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const paymentData = {
      email,
      amount: Math.round(amount * 100), // Paystack expects amount in smallest currency unit (e.g., kobo, cents)
      currency: currency,
    };

    // Add reference if provided
    if (reference) {
      paymentData.reference = reference;
    }

    const response = await fetch(PAYSTACK_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    console.log('Paystack response:', data);

    if (!response.ok) {
        console.error('Paystack API Error:', data);
        return new Response(JSON.stringify({ error: data.message || 'Failed to initialize payment' }), {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in paystack-initialize function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
