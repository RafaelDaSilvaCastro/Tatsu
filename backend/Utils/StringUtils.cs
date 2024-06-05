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
            texto = texto.Replace("#", "");
            texto = texto.Replace("\n", "");
            texto = texto.Replace("`", "");
            texto = texto.Replace("\\\"", "");
            texto = texto.Replace("json", "");
            texto = texto.Replace("Título", "Titulo");
            texto = texto.Replace("Observação", "Observacao");
            texto = texto.Replace("{", " {");
            texto = texto.Replace("Porção", "Porcao");

            char letraInicial = '{';
            texto = RemoveWordsUntilChar(texto, letraInicial );

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

        static string RemoveWordsUntilChar(string input, char targetChar)
        {
            // Split the input string into words using space as a delimiter
            string[] words = input.Split(' ');

            // Iterate over the words and check for the target character at the start of each word
            for (int i = 0; i < words.Length; i++)
            {
                if (words[i].StartsWith(targetChar))
                {
                    // Join the remaining words back into a string and return it
                    return string.Join(" ", words, i, words.Length - i);
                }
            }

            // If the target character is not found, return an empty string
            return string.Empty;
        }
    }
}

