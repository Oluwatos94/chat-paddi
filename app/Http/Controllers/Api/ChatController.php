<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        $request->validate([
            'participant_ids' => 'required|array',
            'participant_ids.*' => 'exists:users,id',
            'name' => 'nullable|string|max:255',
            'type' => 'required|in:private,group',
        ]);

        // Create the conversation
        $conversation = Conversation::create([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
        ]);

        // Attach participants, including the authenticated user
        $participantIds = array_unique(array_merge($request->input('participant_ids'), [Auth::id()]));
        $conversation->users()->attach($participantIds);

        return response()->json([
            'message' => 'Conversation created successfully.',
            'data' => $conversation->load('users')
        ], 201);
    }

    // public function getMessages(Conversation $conversation)
    // {
    //     $messages = $conversation->messages()->with('user')->get();
    //     return response()->json([
    //         'messages' => $messages,
    //     ], 200);
    // }

    public function getMessages(Conversation $conversation)
    {
        Log::info('Fetching messages for conversation', ['conversation_id' => $conversation->id]);

        $messages = $conversation->messages()->with('user')->get();

        Log::info('Messages fetched', ['messages' => $messages->toArray()]);

        return response()->json([
            'messages' => $messages,
        ], 200);
    }



    public function sendMessage(Request $request, Conversation $conversation)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $message = $conversation->messages()->create([
            'content' => $request->content,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => $message->load('user'),
        ], 201);
    }
}
