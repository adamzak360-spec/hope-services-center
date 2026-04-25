/**
 * Notification Service
 * Handles automated email notifications for new submissions
 * Uses FormSubmit.co for sending notification emails
 */

interface NotificationData {
  type: "jobSeeker" | "employer" | "contact";
  data: Record<string, any>;
  recipientEmail: string;
  recipientName: string;
}

export async function sendNotificationEmail(
  notification: NotificationData
): Promise<boolean> {
  try {
    const { type, data, recipientEmail, recipientName } = notification;

    let subject = "";
    let message = "";

    if (type === "jobSeeker") {
      subject = `New Job Seeker Registration: ${data.surname}`;
      message = `
New Job Seeker Registration Received

Name: ${data.surname} ${data.otherNames}
Email: ${data.email}
Phone: ${data.telephone}
Job Title: ${data.jobTitle}
Location: ${data.residentialLocation}
CV: ${data.cvFileName || "Not uploaded"}

Please log in to the admin dashboard to view full details and contact this candidate.
      `;
    } else if (type === "employer") {
      subject = `New Job Posting: ${data.positionRequired}`;
      message = `
New Job Posting Received

Organization: ${data.organizationName}
Position: ${data.positionRequired}
Contact: ${data.contactPerson}
Email: ${data.email}
Phone: ${data.telephone}
Contract Type: ${data.contractType}

Please log in to the admin dashboard to view full details and manage applications.
      `;
    } else if (type === "contact") {
      subject = `New Contact Message: ${data.subject}`;
      message = `
New Contact Message Received

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

Please log in to the admin dashboard to view and respond to this message.
      `;
    }

    // Send notification email using FormSubmit.co
    const formData = new FormData();
    formData.append("email", recipientEmail);
    formData.append("name", recipientName);
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("_subject", subject);
    formData.append("_captcha", "false");

    const response = await fetch(
      "https://formsubmit.co/hope.services@ymail.com",
      {
        method: "POST",
        body: formData,
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error sending notification email:", error);
    return false;
  }
}

export async function sendBulkNotifications(
  submissions: NotificationData[]
): Promise<{ success: number; failed: number }> {
  let successCount = 0;
  let failedCount = 0;

  for (const submission of submissions) {
    const result = await sendNotificationEmail(submission);
    if (result) {
      successCount++;
    } else {
      failedCount++;
    }
    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return { success: successCount, failed: failedCount };
}

export function generateNotificationData(
  type: "jobSeeker" | "employer" | "contact",
  formData: Record<string, any>
): NotificationData {
  let recipientEmail = "hope.services@ymail.com";
  let recipientName = "Hope Services Centre Team";

  if (type === "jobSeeker") {
    recipientEmail = formData.email;
    recipientName = formData.surname;
  } else if (type === "employer") {
    recipientEmail = formData.email;
    recipientName = formData.contactPerson;
  } else if (type === "contact") {
    recipientEmail = formData.email;
    recipientName = formData.name;
  }

  return {
    type,
    data: formData,
    recipientEmail,
    recipientName,
  };
}
