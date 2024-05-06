namespace backend.Data.Context
{
    public class MongoDbConfig
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public List<string> Collections { get; set; }
    }
}
