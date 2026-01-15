export function getTropicalFishColor(palette) {
    let colors = null;

    switch (palette) {
        case 2:
            colors = {
                body: "#FFD94A",    // yellow-orange
                stripe: "#FF8C00",  // orange
                fin: "#4CAF50",     // tropical green
            }
            break;
        case 3:
            // Juvenile Golden Trevally
            // Can be combined with jellyfish
            colors = {
                body: "#FFD23C",    // rich golden yellow
                stripe: "#1A1A1A",  // near-black
                fin: "#FFE680",     // pale golden / translucent yellow
            }
            break;
        case 4:
            // Juvenile Golden Trevally
            // Can be combined with jellyfish
            colors = {
                body: "#FFC107",    // deeper gold
                stripe: "#000000",  // black
                fin: "#FFEB99",     // lighter yellow
            }
            break;
        case 5:
            colors = {
                body: "#7EC8E3",    // soft tropical light blue
                stripe: "#2A6F97",  // deeper blue
                fin: "#A9DCEC",     // pale translucent blue
            }
            break;
        case 6:
            // Can be combined with jellyfish
            colors = {
                body: "#C9D6DF",    // silvery blue-gray
                stripe: "#5F6F7A",  // muted gray
                fin: "#E3EDF2",     // very light translucent
            }
            break;
        case 7:
            // Can be combined with jellyfish
            colors = {
                body: "#1F5F8B",    // deep ocean blue
                stripe: "#0B2F4A",  // very dark blue (almost black)
                fin: "#3F7FA6",     // muted blue
            }
            break;
        case 8:
            // Clownfish
            colors = {
                body: "#FF8C1A",    // bright orange
                stripe: "#FFFFFF",  // clean white
                stripeOutline: "#000000",
                fin: "#FFB347",     // lighter orange
            }
            break;
        case 9:
            // Redtail shark
            colors = {
                body: "#222222",    // deep matte black
                stripe: "#222222",  // no stripe
                fin: "#333333",     // very dark gray (almost black)
                tail: "#FF3B3B",    // vivid red
            }
            break;
        default:
            // 1
            colors = {
                body: "#FF6347",    // red-orange
                stripe: "#FF4500",  // red-orange
                fin: "#FFD700",     // gold
            };
            break;
    }
    colors.tail = colors.tail ?? colors.fin;
    colors.eye = colors.eye ?? "#000000";
    colors.stripeOutline = colors.stripeOutline ?? null;
    return colors;
}