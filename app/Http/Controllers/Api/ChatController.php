<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function getConversations()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $user->conversations()->with('users')->get();
    }

    public function createConversation(Request $request)
    {
        $conversation = conversation::create([
            'name' => $request->name,
            'type' => $request->type,
        ]);

        $conversation->users()->attach($request->user_ids);
        return $conversation;
    }

    public function getMessages(Conversation $conversation)
    {
        return Message::where('conversation_id', $conversation)->with('user')->get();
    }

    public function sendMessage(Request $request, Conversation $conversation)
    {
        return Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);
    }
}
