<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorSpecial extends Model
{
    use HasFactory;
    protected $fillable = [
        'special_name',
        'price',
        'short_about',
        'morea_about',
        'img_url',
        'vendor',
    ];
}
