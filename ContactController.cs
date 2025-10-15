using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using System.Text.Json;

namespace PortfolioContactAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IConfiguration configuration, ILogger<ContactController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ContactRequest request)
        {
            try
            {
                // Validate the request
                if (string.IsNullOrEmpty(request.Name) || 
                    string.IsNullOrEmpty(request.Email) || 
                    string.IsNullOrEmpty(request.Subject) || 
                    string.IsNullOrEmpty(request.Message))
                {
                    return BadRequest(new { error = "All fields are required" });
                }

                // Validate email format
                if (!IsValidEmail(request.Email))
                {
                    return BadRequest(new { error = "Invalid email format" });
                }

                // Send email
                await SendEmailAsync(request);

                _logger.LogInformation($"Contact form submitted successfully from {request.Email}");

                return Ok(new { 
                    success = true, 
                    message = "Message sent successfully! I'll get back to you soon." 
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending contact form message");
                return StatusCode(500, new { 
                    error = "Failed to send message", 
                    message = "Sorry, there was an error sending your message. Please try again or contact me directly." 
                });
            }
        }

        private async Task SendEmailAsync(ContactRequest request)
        {
            // Email configuration - you can store these in appsettings.json
            var smtpServer = _configuration["EmailSettings:SmtpServer"] ?? "smtp.gmail.com";
            var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
            var smtpUsername = _configuration["EmailSettings:Username"] ?? "aniketmandage85@gmail.com";
            var smtpPassword = _configuration["EmailSettings:Password"] ?? "YOUR_APP_PASSWORD"; // Use App Password for Gmail

            using var client = new SmtpClient(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpUsername, "Portfolio Contact Form"),
                Subject = $"Portfolio Contact: {request.Subject}",
                Body = $@"
Name: {request.Name}
Email: {request.Email}
Subject: {request.Subject}

Message:
{request.Message}

---
This message was sent from your portfolio contact form.
",
                IsBodyHtml = false
            };

            mailMessage.To.Add("aniketmandage85@gmail.com");
            mailMessage.ReplyToList.Add(new MailAddress(request.Email, request.Name));

            await client.SendMailAsync(mailMessage);
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }

    public class ContactRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
