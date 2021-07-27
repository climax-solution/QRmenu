<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorPackage extends Model
{
    protected $fillable = [
        'id',
        'package_name',
        'img_url',
        'price',
        'vendor',
        'details'
    ];

    use HasFactory;
}
