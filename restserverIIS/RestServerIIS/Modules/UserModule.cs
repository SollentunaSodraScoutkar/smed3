using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
using Dapper;
using Nancy;
using Newtonsoft.Json;

namespace RestServerIIS.Modules
{
    public class UserModule : NancyModule
    {
        private readonly string _connectionString = ConfigHandler.GetConnectionString();

        public UserModule()
            : base("/users")
        {
            Get["/"] = parameters => GetAllUsers();
        }

        private dynamic GetAllUsers()
        {
            const string sql = "SELECT * FROM SmedUser";
            using (var conn = new SqlConnection(_connectionString))
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
