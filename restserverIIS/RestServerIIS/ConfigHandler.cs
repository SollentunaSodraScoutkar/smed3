using System;
using System.Configuration;

namespace RestServerIIS
{
    public class ConfigHandler
    {
        public static string GetConnectionString()
        {
            string returnValue = null;

            ConnectionStringSettings settings =
                ConfigurationManager.ConnectionStrings["SmedDb"];

            if (settings != null)
            {
                returnValue = settings.ConnectionString;
            }
            else
            {
                throw new Exception("ConnectionString not found in config");
            }
            return returnValue;
        }
    }
}