<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 *
 *
 * @property int $id
 * @property string|null $name
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\message> $messages
 * @property-read int|null $messages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|conversation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Conversation extends Model
{
    protected $fillable = [
        'name',
        'type'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'conversation_user', 'conversation_id', 'user_id')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class)->orderBy('created_at', 'desc');
    }
}
