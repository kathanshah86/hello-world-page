import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return new Response(JSON.stringify({ error: "Phone and OTP are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find the OTP
    const { data: otpRecord, error } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("phone", phone)
      .eq("otp_code", otp)
      .eq("verified", false)
      .gte("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !otpRecord) {
      return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark as verified
    await supabase.from("otp_codes").update({ verified: true }).eq("id", otpRecord.id);

    // Check if user exists in auth, if not create one
    const email = `${phone.replace("+", "")}@phone.vaanipay.app`;
    
    // Try to find existing user
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    let session = null;
    
    if (existingUser) {
      // Generate a session for existing user
      const { data, error: signInError } = await supabase.auth.admin.generateLink({
        type: "magiclink",
        email,
      });
      
      if (signInError) {
        console.error("Sign in error:", signInError);
      }

      // Sign in with password (we set a deterministic password based on phone)
      const { data: signInData, error: pwError } = await supabase.auth.signInWithPassword({
        email,
        password: `vp_${phone}_secure`,
      });
      
      if (!pwError) {
        session = signInData.session;
      }
    } else {
      // Create new user
      const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password: `vp_${phone}_secure`,
        email_confirm: true,
        user_metadata: { phone },
      });

      if (signUpError) {
        console.error("Sign up error:", signUpError);
        return new Response(JSON.stringify({ error: "Failed to create account" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Sign in the new user
      const { data: signInData } = await supabase.auth.signInWithPassword({
        email,
        password: `vp_${phone}_secure`,
      });
      session = signInData?.session;
    }

    // Clean up used OTPs
    await supabase.from("otp_codes").delete().eq("phone", phone);

    return new Response(JSON.stringify({ 
      success: true, 
      session,
      message: "OTP verified successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
