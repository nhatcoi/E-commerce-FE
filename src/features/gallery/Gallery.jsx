import { useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { ScrollArea } from "src/components/ui/scroll-area";
import { Badge } from "src/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import {
    LayoutGrid,
    List,
    MoreVertical,
    Plus,
    Upload,
    Edit,
    Trash2,
    Image as ImageIcon,
} from "lucide-react";
import GalleryForm from "./GalleryForm";

// Mock data for development - replace with actual API calls
const MOCK_IMAGES = [
    {
        id: 1,
        title: "Product Banner 1",
        description: "Main banner for homepage slider",
        url: "https://picsum.photos/800/600?random=1",
        tags: ["banner", "homepage"],
        type: "banner",
        createdAt: "2025-05-04T10:00:00Z"
    },
    {
        id: 2,
        title: "Promo Graphic Spring Sale",
        description: "Spring sale promotional graphic",
        url: "https://picsum.photos/800/600?random=2",
        tags: ["promo", "spring", "sale"],
        type: "promotion",
        createdAt: "2025-04-28T14:15:00Z"
    },
    {
        id: 3,
        title: "Category Header - Electronics",
        description: "Header for electronics category page",
        url: "https://picsum.photos/800/600?random=3",
        tags: ["category", "electronics"],
        type: "header",
        createdAt: "2025-04-26T09:00:00Z"
    },
    {
        id: 4,
        title: "Social Media Teaser",
        description: "Teaser image for social media campaign",
        url: "https://picsum.photos/800/600?random=4",
        tags: ["social", "teaser"],
        type: "social",
        createdAt: "2025-05-01T18:45:00Z"
    },
    {
        id: 5,
        title: "Product Thumbnail - Watch",
        description: "Thumbnail image for luxury watch product",
        url: "https://picsum.photos/800/600?random=5",
        tags: ["product", "thumbnail", "watch"],
        type: "thumbnail",
        createdAt: "2025-04-30T12:00:00Z"
    },
    {
        id: 6,
        title: "Banner - Summer Collection",
        description: "Homepage banner for summer fashion line",
        url: "https://picsum.photos/800/600?random=6",
        tags: ["banner", "fashion", "summer"],
        type: "banner",
        createdAt: "2025-04-25T11:30:00Z"
    },
    {
        id: 7,
        title: "Ad Image - Free Shipping",
        description: "Ad image for free shipping offer",
        url: "https://picsum.photos/800/600?random=7",
        tags: ["ad", "shipping"],
        type: "advertisement",
        createdAt: "2025-04-29T08:10:00Z"
    },
    {
        id: 8,
        title: "Hero Image - Men's Fashion",
        description: "Hero image for men's fashion landing page",
        url: "https://picsum.photos/800/600?random=8",
        tags: ["hero", "fashion", "men"],
        type: "hero",
        createdAt: "2025-04-27T16:00:00Z"
    },
    {
        id: 9,
        title: "Infographic - How It Works",
        description: "Informational graphic for process explanation",
        url: "https://picsum.photos/800/600?random=9",
        tags: ["infographic", "guide"],
        type: "informational",
        createdAt: "2025-04-23T10:20:00Z"
    },
    {
        id: 10,
        title: "Feature Highlight - Mobile App",
        description: "Image highlighting mobile app features",
        url: "https://picsum.photos/800/600?random=10",
        tags: ["feature", "mobile", "app"],
        type: "feature",
        createdAt: "2025-04-22T15:45:00Z"
    },
    {
        id: 11,
        title: "Testimonial Banner",
        description: "Customer testimonial with banner layout",
        url: "https://picsum.photos/800/600?random=11",
        tags: ["testimonial", "banner"],
        type: "testimonial",
        createdAt: "2025-04-20T13:00:00Z"
    }
];


export default function Gallery() {
    const [viewType, setViewType] = useState("grid");
    const [images, setImages] = useState(MOCK_IMAGES);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);

    const filteredImages = images.filter(
        (image) =>
            image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            image.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const handleDeleteImage = (id) => {
        // TODO: Add confirmation dialog
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const handleEditImage = (image) => {
        setSelectedImage(image);
        setIsFormOpen(true);
    };

    const handleAddImage = () => {
        setSelectedImage(null);
        setIsFormOpen(true);
    };

    const ImageCard = ({ image }) => (
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={image.url}
                    alt={image.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleEditImage(image)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(image.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{image.title}</CardTitle>
                <CardDescription>{image.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2">
                {image.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
                <Badge variant="outline">{image.type}</Badge>
            </CardFooter>
        </Card>
    );

    const ImageListItem = ({ image }) => (
        <div className="flex items-center gap-4 p-4 hover:bg-muted/50 rounded-lg group">
            <div className="w-40 aspect-video rounded-md overflow-hidden">
                <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-medium">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {image.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs">
                        {image.type}
                    </Badge>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEditImage(image)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteImage(image.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
                    <p className="text-muted-foreground">
                        Manage your images and media files
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                    <Button variant="outline" onClick={handleAddImage}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search images..."
                    className="max-w-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewType === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewType("grid")}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewType === "list" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewType("list")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)]">
                {filteredImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-60 text-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No images found</h3>
                        <p className="text-muted-foreground">
                            {searchQuery
                                ? "Try adjusting your search terms"
                                : "Start by uploading or adding new images"}
                        </p>
                    </div>
                ) : viewType === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ImageCard image={image} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ImageListItem image={image} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </ScrollArea>

            <GalleryForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                image={selectedImage}
            />
        </div>
    );
}