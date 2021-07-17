<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'order_name',
        'phone',
        'order_type',
        'comments',
        'overview',
        'status',
        'vendor',
        'guest_number',
        'table_reservation',
        'reservation_date',
        'created_at'
    ];
    const UPDATED_AT = null;

}
