/*Here is the explicit purpose of each interface in your system:

1. IBookingRepository.ts
Purpose: Abstraction of Data Storage (Database Operations)

IBookingRepository defines what database operations can be performed on bookings (e.g., saveBooking, findBookingById, getDailyBookingsByZone), without caring how or where the data is stored.

Why it matters:
Decouples Business Logic from the Database: Your core business logic (e.g., confirming a haircut appointment or calculating transport fees) doesn't care whether you use PostgreSQL, Supabase, MongoDB, or a local JSON file for testing.

Adheres to Dependency Inversion (DIP): High-level use cases depend on IBookingRepository (an abstraction), not on PostgresBookingRepository (a concrete database class).

Testability: You can easily pass a dummy MockBookingRepository during unit tests without touching a real database.

2. INotifier.ts
Purpose: Abstraction of Communication Services (Notifications & Reminders)

INotifier defines the contract for sending messages to clients (e.g., sendRebookingReminder, sendConfirmationSMS, sendWhatsAppAlert).

Why it matters:
Flexible Communication Channels: Today, you are using Meta's WhatsApp Business API for Strategy A (automated 12-day rebooking prompts). Tomorrow, you might want to switch to Twilio, Africa's Talking SMS, or an Email gateway.

Single Change Principle: When switching from Twilio to WhatsApp, you only write a new adapter class implementing INotifier. You never have to touch or rewrite your core booking code.

Prevents Vendor Lock-in: Third-party APIs change their code and pricing frequently. INotifier insulates your business from being tied to any single provider.*/