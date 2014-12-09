using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
using Dapper;
using Nancy;
using Newtonsoft.Json;

namespace NancyRestServer.Modules
{
    public class UserModule : NancyModule
    {
        private const string MyConnectionString = @"Server=MACMINI-PC\SQLEXPRESS;User Id=SMED;Password=SMED;Database=beemem";

        public UserModule() : base("/user")
        {
            Get["/"] = parameters => GetAllUsers();
        }

        private dynamic GetAllUsers()
        {
            const string sql = "SELECT * FROM SmedUser";
            using (var conn = new SqlConnection(MyConnectionString))
            {
                conn.Open();
                var users = conn.Query<User>(sql);
                return JsonConvert.SerializeObject(users);
            }
        }

        // ReSharper disable once ClassNeverInstantiated.Local
        [SuppressMessage("ReSharper", "InconsistentNaming")]
        private class User
        {
            public string varFirstName { get; set; }
            public string varSurName { get; set; }
        }
    }
}
