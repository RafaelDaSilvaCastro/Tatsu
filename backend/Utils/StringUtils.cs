using System.Text.RegularExpressions;
using System.Text;
using MMLib.Extensions;
using System.Globalization;

namespace backend.Utils
{
    public static class StringUtils
    {
        public static String FormatarString(String texto)
        {

            texto = texto.Replace("\n", "");
            texto = texto.Replace("`", "");
            texto = texto.Replace("\\\"", "");
            texto = texto.Replace("json", "");
            texto = texto.Replace("Título", "Titulo");
            texto = texto.Replace("Observação", "Observacao");
            texto = texto.Replace("Porção", "Porcao");
            return texto;
        }

        public static string RemoverAcentuacaoDasChaves(string json, params string[] chaves)
        {
            foreach (string chave in chaves)
            {

                string padrao = $"'{chave}': '(.*?)'";
                string substituto = $"'{chave}': '$1'";
                //substituto = RemoverAcentuacao(substituto);

                json = Regex.Replace(json, padrao, substituto);
            }

            return json;
        }

        public static string RemoverAcentuacao(this string text)
        {
            return new string(text
                .Normalize(NormalizationForm.FormD)
                .Where(ch => char.GetUnicodeCategory(ch) != UnicodeCategory.NonSpacingMark)
                .ToArray());
        }
    }
}
