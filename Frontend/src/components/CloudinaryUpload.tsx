import React, { Component, createRef } from "react"

export interface CloudinaryAttachment {
    access_mode: "public"
    asset_folder: string
    asset_id: string
    bytes: number
    created_at: string
    display_name: string
    etag: string
    format: string
    height: number
    original_extension: string
    original_filename: string
    placeholder: boolean
    public_id: string
    resource_type: string
    secure_url: string
    signature: string
    tags: string[]
    type: string
    url: string
    version: number
    version_id: string
    width: number
}

interface CloudinaryUploadProps {
    onAttachUrl?: (data: CloudinaryAttachment) => void
    anchorEl: React.ReactNode
}

class CloudinaryUpload extends Component<CloudinaryUploadProps> {
    private fileInputRef = createRef<HTMLInputElement>()

    handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const file = event.target.files[0]
        if (!file) return

        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append(
                "upload_preset",
                import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
            )

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${
                    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                }/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(`Upload failed: ${errorData.error.message}`)
            }

            const data = await response.json()
            if (this.props.onAttachUrl) {
                console.log(data)
                this.props.onAttachUrl(data)
            }
        } catch (error: any) {
            console.error("CloudinaryUpload.error: ", error)
            alert(`Upload failed: ${error.message}`)
        }
    }

    handleClick = () => {
        this.fileInputRef.current?.click()
    }

    render() {
        const { anchorEl } = this.props
        return (
            <>
                <input
                    type="file"
                    ref={this.fileInputRef}
                    style={{ display: "none" }}
                    onChange={this.handleFileChange}
                />
                <label onClick={this.handleClick}>{anchorEl}</label>
            </>
        )
    }
}

export default CloudinaryUpload
