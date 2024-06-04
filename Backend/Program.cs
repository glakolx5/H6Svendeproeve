using Backend.Infrastructure;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

//Identity services
//Add authentication
builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);

//Add authorization
builder.Services.AddAuthorizationBuilder();


//MySQL configure variables
var connectionString = builder.Configuration.GetConnectionString("ExamDB");
var serverVersion = new MySqlServerVersion(new Version(8, 4, 0));


builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseMySql(connectionString, serverVersion);
});

//
builder.Services.AddIdentityCore<AppUser>()
    .AddEntityFrameworkStores<MyDbContext>()
    .AddApiEndpoints();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
    b => b.AllowAnyHeader().
        AllowAnyOrigin().
        AllowAnyHeader()
    );
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Mapping of identity
app.MapIdentityApi<AppUser>();

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
