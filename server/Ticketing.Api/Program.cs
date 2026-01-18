using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ticketing.Api.Models;
using Ticketing.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS: allow local dev clients (optional for Swagger)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// DI
builder.Services.AddSingleton<ITicketRepository, InMemoryTicketRepository>();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors();

// Enable Swagger UI always
app.UseSwagger();
app.UseSwaggerUI();

// Redirect root to Swagger UI
app.MapGet("/", () => Results.Redirect("/swagger"));

// Endpoints
// GET /tickets?status=open|closed|all
app.MapGet("/tickets", (ITicketRepository repo, string? status) =>
{
    var tickets = repo.GetAll();
    return status?.ToLowerInvariant() switch
    {
        "open" => Results.Ok(tickets.Where(t => !t.IsClosed)),
        "closed" => Results.Ok(tickets.Where(t => t.IsClosed)),
        _ => Results.Ok(tickets)
    };
});

// POST /tickets -> 201 Created with Location and documented type
app.MapPost("/tickets", (ITicketRepository repo, CreateTicketRequest request) =>
{
    if (request is null) return Results.BadRequest(new { error = "Request body is required." });
    if (request.UserId <= 0) return Results.BadRequest(new { error = "UserId must be a positive integer." });
    if (string.IsNullOrWhiteSpace(request.Subject)) return Results.BadRequest(new { error = "Subject is required." });
    if (string.IsNullOrWhiteSpace(request.Description)) return Results.BadRequest(new { error = "Description is required." });

    var created = repo.Add(request);
    return TypedResults.Created($"/tickets/{created.TicketId}", created);
});

// PUT /tickets/{id}/close -> 204 NoContent or 404 NotFound
app.MapPut("/tickets/{id:int}/close", (int id, ITicketRepository repo) =>
{
    var success = repo.Close(id);
    return success ? Results.NoContent() : Results.NotFound(new { error = $"Ticket {id} not found or already closed." });
});

app.Run();
