<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_number',
        'name',
        'phone',
        'address',
        'order_type',
        'overview',
        'status',
        'vendor',
    ];
}
