<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;
    protected $fillable = [
        'package_name',
        'slug',
        'package_type',
        'order_limit',
        'item_limit',
        'package_ability',
        'price',
    ];
    public $timestamps = false;
}
