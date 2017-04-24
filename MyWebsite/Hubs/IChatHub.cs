using System.Threading.Tasks;

namespace MyWebsite.Hubs
{
    public interface IChatHub
    {
        Task ServerMessage(string message);
    }
}