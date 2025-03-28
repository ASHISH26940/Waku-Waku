import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "69c796beeab1d3",
      pass: "d0f6b2898cd28a"
    }
});

export const sendFailureMail = async (
    to: string,
    url: string,
    location: string
  ) => {
    try {
      const mailOptions = {
        from: '"SiteGuardian Alerts" <alerts@siteguardian.com>',
        to,
        subject: `🚨 Uh-oh! ${url} is Down`,
        text: `Hey there,
  
  Looks like your website is taking an unexpected nap. Our monitors just detected that it's currently down.
  
  🔗 Website: ${url}  
  📍 Checked from: ${location}  
  🕒 Time: ${new Date().toLocaleString()}
  
  No worries, we’ve got our eyes on it and will let you know when it's back up and running!
  
  Hang tight,  
  The SiteGuardian Team`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #d9534f;">🚨 Uh-oh! Your Website is Down</h2>
            <p>Hey there,</p>
            <p>Looks like <strong>${url}</strong> is taking an unexpected nap. Our system just detected that it's down.</p>
            <p><strong>🔗 Website:</strong> <a href="${url}" target="_blank">${url}</a></p>
            <p><strong>📍 Checked from:</strong> ${location}</p>
            <p><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
            <p>No worries, we're keeping an eye on things and will let you know as soon as it's back online.</p>
            <p>Hang tight,</p>
            <p><strong>The SiteGuardian Team</strong></p>
          </div>
        `,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  export const sendLatencyAlertMail = async (
    to: string,
    url: string,
    latency: number,
    websiteLatencyAlert: number
  ) => {
    try {
      const mailOptions = {
        from: '"SiteGuardian Alerts" <alerts@siteguardian.com>',
        to,
        subject: `⚡ Great News! ${url} is Blazing Fast`,
        text: `Hey there,
  
  Good news! Your website is running smoother than ever with low latency.
  
  🔗 Website: ${url}  
  ⚡ Current Latency: ${latency}ms  
  🕒 Time: ${new Date().toLocaleString()}
  
  Faster load times mean a better experience for your visitors. Keep up the great work!
  
  Stay awesome,  
  The SiteGuardian Team`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #28a745;">⚡ Great News! Your Website is Blazing Fast</h2>
            <p>Hey there,</p>
            <p>Your monitored website, <strong>${url}</strong>, is running <strong>faster than ever</strong> with low latency.</p>
            <p><strong>🔗 Website:</strong> <a href="${url}" target="_blank">${url}</a></p>
            <p><strong>⚡ Current Latency:</strong> ${latency}ms</p>
            <p><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
            <p>Fast websites make happy users. Keep up the awesome work!</p>
            <p>Stay awesome,</p>
            <p><strong>The SiteGuardian Team</strong></p>
          </div>
        `,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  