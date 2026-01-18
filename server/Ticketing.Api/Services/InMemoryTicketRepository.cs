using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using Ticketing.Api.Models;

namespace Ticketing.Api.Services
{
    public class InMemoryTicketRepository : ITicketRepository
    {
        private readonly ConcurrentDictionary<int, Ticket> _store = new();
        private int _nextId = 0;

        public IReadOnlyCollection<Ticket> GetAll() => _store.Values.ToArray();

        public Ticket Add(CreateTicketRequest request)
        {
            var id = Interlocked.Increment(ref _nextId);
            var ticket = new Ticket(id, request.UserId, request.Subject.Trim(), request.Description.Trim(), false);
            _store[id] = ticket;
            return ticket;
        }

        public bool Close(int id)
        {
            if (_store.TryGetValue(id, out var existing))
            {
                if (existing.IsClosed) return false;
                var updated = existing with { IsClosed = true };
                _store[id] = updated;
                return true;
            }
            return false;
        }
    }
}
