<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderConfiguration extends Model
{
    use HasFactory;
    protected $fillable = [
        'user',
        'content_betal',
        'bestilling',
        'henting',
        'betal',
        'spis',
        'paypal_email',
        'paypal_payment',
        'paypal_status',
        'paypal_gateway',
        'paypal_gateway_status',
        'paypal_gateway_eamil',
        'bambora_gateway',
        'bambora_access_key',
        'bambora_merchant_key',
        'bambora_secret_key',
        'whatsapp',
        'stock_status',
        'stock_counter',
        'kds',
        'delivery_charge',
        'stripe_gateway',
        'strpe_public_key',
        'strpe_secret_key',
    ];
}
