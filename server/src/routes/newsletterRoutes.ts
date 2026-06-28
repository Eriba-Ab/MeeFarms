import { Router, Request, Response } from 'express';
import { Resend } from 'resend';

const router = Router();

router.post('/subscribe', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Newsletter service not configured' });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'MEE FARMS <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to MEE FARMS Newsletter!',
      html: `
        <div style="font-family: 'Open Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
          <div style="background: #4a7c3f; padding: 32px; text-align: center;">
            <h1 style="color: #fff; font-size: 28px; margin: 0; font-weight: 900;">🌾 MEE FARMS</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Healthy Eating, Healthy Living</p>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: #2d3526; font-size: 22px; margin: 0 0 16px;">Welcome to the MEE FARMS Community!</h2>
            <p style="color: #666; line-height: 1.7; margin: 0 0 16px;">
              Thank you for subscribing to our newsletter. You'll now receive the latest updates on:
            </p>
            <ul style="color: #666; line-height: 2; padding-left: 20px;">
              <li>Seasonal farming insights and tips</li>
              <li>New products and special offers</li>
              <li>Outgrower program opportunities</li>
              <li>Agricultural news from across Nigeria</li>
            </ul>
            <div style="margin: 32px 0; text-align: center;">
              <a href="https://meefarms.com/shop" style="background: #4a7c3f; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">
                Shop Fresh Produce
              </a>
            </div>
          </div>
          <div style="background: #1a2010; padding: 24px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
              © 2026 MEE FARMS. 5 Damder Street, Jalingo, Taraba State, Nigeria.<br/>
              <a href="#" style="color: rgba(255,255,255,0.4);">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Subscribed successfully' });
  } catch (err: any) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Failed to send confirmation email' });
  }
});

export default router;
