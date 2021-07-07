<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentSetting extends Model
{
    use HasFactory;
    protected $fillable = [
        'paypal_payment',
        'paypal_status',
        'payment_email',
        'stripe_gateway',
        'stripe_public_key',
        'stripe_secret_key',
        'razor_payment',
        'razor_key',
        'bambora_gateway',
        'bambora_access_key',
        'bambora_merchant',
        'bambora_secret_key'
    ];
}
