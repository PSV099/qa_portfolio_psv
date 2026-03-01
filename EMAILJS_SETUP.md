# EmailJS Configuration Guide

To enable email sending from your contact form, follow these steps:

## Step 1: Create a Free EmailJS Account
1. Go to https://www.emailjs.com
2. Click "Sign Up Free" and create your account
3. Verify your email

## Step 2: Get Your User ID
1. After login, go to the **Account** section
2. Copy your **User ID** (looks like: `abc123def456ghi789`)
3. This is your `EMAILJS_USER_ID`

## Step 3: Create an Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail** (or your email provider)
4. Connect your email: `psvijayarangan@gmail.com`
5. Copy the **Service ID** (e.g., `service_xyz123abc`)
6. This is your `EMAILJS_SERVICE_ID`

## Step 4: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set the template name (e.g., "Contact Form")
4. In the template, configure:
   - **To Email**: `{{to_email}}`
   - **From Name**: `{{from_name}}`
   - **Reply-To**: `{{reply_to}}`
   - **Subject**: `New Contact Form Message from {{from_name}}`
   - **Body**: 
     ```
     Name: {{from_name}}
     Email: {{from_email}}

     Message:
     {{message}}
     ```
5. Save the template
6. Copy the **Template ID** (e.g., `template_abc123xyz`)
7. This is your `EMAILJS_TEMPLATE_ID`

## Step 5: Update Your Code
Open `js/main.js` and find the EmailJS configuration section (around line 230):

```javascript
const EMAILJS_USER_ID = 'YOUR_USER_ID_HERE'; // Replace with your User ID
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE'; // Replace with your Template ID
```

Replace the placeholder values with your actual credentials from EmailJS.

## Step 6: Test Your Form
1. Open your portfolio in a browser
2. Go to the Contact section
3. Fill out the form:
   - **Name**: Your Name
   - **Email**: Your email
   - **Message**: A test message
4. Click "Send Message"
5. Check your email (psvijayarangan@gmail.com) for the message
6. You should also receive a reply-to at the sender's email

## Troubleshooting

### Emails not sending?
1. Make sure all three IDs are correctly copied
2. Check browser console (F12) for error messages
3. Verify Gmail security settings allow EmailJS access
4. Check that your EmailJS account is active

### Still having issues?
- Check the EmailJS documentation: https://www.emailjs.com/docs/
- Ensure your service is properly set up and connected

## Security Note
Your `EMAILJS_USER_ID` is visible in the browser code, which is safe. EmailJS is designed for this public key usage. However:
- Keep your `EMAILJS_SERVICE_ID` and `EMAILJS_TEMPLATE_ID` private
- Don't share your email password or private EmailJS tokens
- Consider environment variables for production deployments

---

**After you complete these steps, your contact form will send real emails to `psvijayarangan@gmail.com`!**
