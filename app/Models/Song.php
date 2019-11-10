<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'title', 'artist', 'lyrics',
    ];
}
