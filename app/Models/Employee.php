<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Employee extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'employees';

    protected $guarded = ['id'];

    protected $casts = [
        'features' => 'array'
    ];

    /**
     * Begin querying the model.
     *
     * @return \Illuminate\Database\Eloquent\Builder|self
     */
    public static function query()
    {
        return (new static)->newQuery();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover')
            ->useDisk('employeesFiles');
    }
}
