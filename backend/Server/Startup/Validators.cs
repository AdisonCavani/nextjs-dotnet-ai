﻿using FluentValidation;
using Server.Contracts.Requests;
using Server.Validators;

namespace Server.Startup;

public static class Validators
{
    public static void AddValidators(this IServiceCollection services)
    {
        services.AddScoped<IValidator<CreateTaskReq>, CreateTaskReqValidator>();
        services.AddScoped<IValidator<UpdateTaskReq>, UpdateTaskReqValidator>();
    }
}