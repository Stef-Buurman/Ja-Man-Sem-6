using System.Reflection;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;

public class RequireAllPropertiesSchemaFilter : ISchemaFilter
{
    public void Apply(IOpenApiSchema schema, SchemaFilterContext context)
    {
        if (schema.Properties == null || context.Type == null)
            return;

        foreach (var property in context.Type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            var schemaPropertyName = ToCamelCase(property.Name);

            if (!schema.Properties.TryGetValue(schemaPropertyName, out var _))
                continue;

            if (IsNullable(property))
                continue;

            if (schema.Required != null)
                schema.Required.Add(schemaPropertyName);
        }
    }

    private static bool IsNullable(PropertyInfo property)
    {
        if (Nullable.GetUnderlyingType(property.PropertyType) != null)
            return true;

        if (!property.PropertyType.IsValueType)
        {
            var nullableContext = new NullabilityInfoContext();
            var nullabilityInfo = nullableContext.Create(property);
            return nullabilityInfo.WriteState == NullabilityState.Nullable;
        }

        return false;
    }

    private static string ToCamelCase(string value)
    {
        if (string.IsNullOrEmpty(value) || !char.IsUpper(value[0]))
            return value;

        return char.ToLowerInvariant(value[0]) + value[1..];
    }
}