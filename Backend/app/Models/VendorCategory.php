<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_name',
        'type',
        'order',
        'details',
        'vendor'
    ];
}
