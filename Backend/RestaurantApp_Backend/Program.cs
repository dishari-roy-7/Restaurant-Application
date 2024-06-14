﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RestaurantApp_Backend.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<RestaurantApp_BackendContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("RestaurantApp_BackendContext") ?? throw new InvalidOperationException("Connection string 'RestaurantApp_BackendContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();


// this is comment;
