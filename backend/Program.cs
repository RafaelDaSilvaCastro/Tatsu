using backend.Controllers;
using backend.Data.Context;
using backend.Data.Repositories;
using backend.Interfaces;
using backend.Rules;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

//Conexao do banco
//var connectionString = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ConnectionString"));
//var connection = builder.Configuration["ConnectionString"];

builder.Services.Configure<MongoDbConfig>(builder.Configuration.GetSection("MongoDbConfig"));
builder.Services.AddSingleton<ReceitaRegras>();
builder.Services.AddSingleton<ReceitaController>();
builder.Services.AddSingleton<ReceitaServices>();
builder.Services.AddSingleton<ReceitaRepositoy>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//builder.Services.AddDbContext<UsuarioContext>(opts =>
//{
//    opts.UseSqlServer(connection);
//});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Habilita o CORS
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
