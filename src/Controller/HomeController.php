<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\NewsRepository;

class HomeController extends AbstractController
{
    /**
     * @var NewsRepository
     */
    private $newsRepository;

    public function __construct(NewsRepository $newsRepository){
        $this->newsRepository = $newsRepository;
    }

    /**
     * @Route("/", name="app_home")
     */
    public function index(): Response
    {
        $news = $this->newsRepository->findAll();
        return $this->render('home/index.html.twig', [
            'news' => $news,
        ]);
    }

    /**
     * @Route("/v2", name="app_home_alternative")
     */
    public function alternative(): Response
    {
        $news = $this->newsRepository->findAll();
        return $this->render('home/alternative.html.twig', [
            'news' => $news,
        ]);

    }
}
