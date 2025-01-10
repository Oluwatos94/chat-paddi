<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int $id
 * @property int $conversation_id
 * @property int $user_id
 * @property string $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\conversation $conversation
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message whereConversationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|message whereUserId($value)
 * @mixin \Eloquent
 */
class Message extends Model
{
    use HasFactory;

    protected $fillable =
    [
        'conversation_id',
        'user_id',
        'content',
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
