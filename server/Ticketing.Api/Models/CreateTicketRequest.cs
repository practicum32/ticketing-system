namespace Ticketing.Api.Models
{
    public record CreateTicketRequest(int UserId, string Subject, string Description);
}
