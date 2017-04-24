using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using System;
using System.Threading.Tasks;

namespace MyWebsite.Hubs
{
    [HubName("chathub")]
    public class ChatHub : Hub<IChatHub>
    {
        public override async Task OnConnected()
        {
            await Clients.All.ServerMessage($"[{DateTime.Now.ToString("HH:mm:ss")}] {Context.ConnectionId} joined");
        }

        public override async Task OnDisconnected(bool stopCalled)
        {
            await Clients.All.ServerMessage($"[{DateTime.Now.ToString("HH:mm:ss")}] {Context.ConnectionId} left");
        }

        public Task ClientMessage(dynamic data)
        {
            string name = data.name.Value;
            string message = data.message.Value;
            return Clients.All.ServerMessage($"[{DateTime.Now.ToString("HH:mm:ss")}] {name}: {message}");
        }
    }
}