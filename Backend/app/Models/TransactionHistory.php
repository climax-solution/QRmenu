<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHistory extends Model
{
    protected $fillable = [
        'username',
        'package',
        'price',
        'status',
        'txnid',
        'payment',
        'payment_date'
    ];
    use HasFactory;
}
