<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BaseAPIController extends Controller
{
    public function successResponse($message, $data = [], $statusCode = 200)
    {
        $data = array_merge($data, [
            'success' => true,
            'message' => $message
        ]);

        if (!isset($data['silent'])) {
            $data['silent'] = false;
        }

        return Response::json($data, $statusCode);
    }

    public function silentSuccessResponse($message, $data = [], $statusCode = 200)
    {
        $data['silent'] = true;

        return $this->successResponse($message, $data, $statusCode);
    }

    public function failResponse($message, $data = [], $statusCode = 500)
    {
        $data = array_merge($data, [
            'success' => false,
            'message' => $message
        ]);

        return Response::json($data, $statusCode);
    }

    /**
     *
     * @param $model
     * @param $value
     * @param string $key
     * @return Model;
     */
    public function findModel($model, $value, $key = 'id')
    {
        /* @var Model $model */
        $result = $model::query()->where($key, $value)->first();

        if (!$result) {
            throw new NotFoundHttpException('Model Not found');
        }

        return $result;
    }

    public function handleModelMedia($model, Request $request, $collection)
    {

    }
}
