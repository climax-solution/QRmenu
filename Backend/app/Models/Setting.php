<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'currency',
        'timezone',
        'site_name',
        'copyright',
        'description',
        'google_analytics',
        'recaptcha',
        'site_key',
        'secret_key',
        'normal_setting',
    ];
}
