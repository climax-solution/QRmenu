<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailSetting extends Model
{
    use HasFactory;
    protected $fillable = [
        'regist_subject',
        'payment_subject',
        'recovery_password',
        'email'
    ];
}
