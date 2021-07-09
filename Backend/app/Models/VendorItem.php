<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'category',
        'vendor',
        'title',
        'img_url',
        'short_des',
        'more_des',
        'status',
        'price',
    ];
}
