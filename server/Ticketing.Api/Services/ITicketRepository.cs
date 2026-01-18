using System.Collections.Generic;
using Ticketing.Api.Models;

namespace Ticketing.Api.Services
{
    public interface ITicketRepository
    {
        IReadOnlyCollection<Ticket> GetAll();
        Ticket Add(CreateTicketRequest request);
        bool Close(int id);
    }
}
