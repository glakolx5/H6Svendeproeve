using Backend.Infrastructure;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.


/*
    Identity services
    Adding of authentication using of bearer token
*/
builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);

//Add authorization
builder.Services.AddAuthorizationBuilder();

//MySQL configure variables
var connectionString = builder.Configuration.GetConnectionString("ExamDB");
var serverVersion = new MySqlServerVersion(new Version(8, 4, 0));


//Adding of Db context using MySQL
builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseMySql(connectionString, serverVersion);
});

/*
    Adding of IdentityCore and Endpoints made from Identity
    Will create
    /login
    /refresh
    etc..
*/
builder.Services.AddIdentityCore<AppUser>()
    .AddEntityFrameworkStores<MyDbContext>()
    .AddApiEndpoints();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*
    This is not recommended configuration
    It should be configure according to frontend endpoint
*/
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

//Still not recommended
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
