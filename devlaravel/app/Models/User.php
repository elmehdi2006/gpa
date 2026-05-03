<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable ;

class User extends Authenticatable
{
    //
    use HasFactory, HasApiTokens  ;

    protected $fillable = ['name' , 'email' , 'role' , 'poste' ,'password' , 'is_archived' , 'archived_at'];

    protected $hidden = ['password'];

    protected function casts()
    {
        return [
            'password' => 'hashed' , 
            'is_archived' => 'boolean' ,
            'archived_at' => 'datetime'
        ] ;   
    } 

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isEmploye(): bool
    {
        return $this->role === 'employe';
    }

    public function isArchived(): bool
    {
        return $this->is_archived;
    }
}
