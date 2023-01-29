﻿using Server.Contracts;

namespace Server.Database.Entities;

public class PostEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public required string Code { get; set; }
    public LanguageEnum Language { get; set; }
    public ThemeEnum Theme { get; set; }
}