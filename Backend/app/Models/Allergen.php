<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allergen extends Model
{
    protected $fillable = [
        'id',
        'name',
        'img_url',
        'status'
    ];

    use HasFactory;
}
