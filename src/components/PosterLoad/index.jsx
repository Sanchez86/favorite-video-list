import React from 'react';
import { Button, TextField, Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

const PosterLoad = ({ image, loading, customImageUrl, handleClick, setCustomImageUrl, handleChange }) => {

    return (
        <Box className='img-block'>

            <FormControlLabel
                sx={{
                    display: 'block',
                }}
                control={
                    <Switch
                        checked={loading}
                        onChange={handleClick}
                        name="loading"
                    />
                }
                label={loading ? 'Вставить ссылку' : 'Загрузить картинку'}
            />
            <Box>
                <Button
                    variant="contained"
                    component="label"
                    className='btn-upload'
                    disabled={loading}
                >

                    {typeof (image) === 'string' ? <DownloadDoneIcon /> :

                        image?.name.length > 0 ? <DownloadDoneIcon /> : <DownloadIcon />
                    }
                    <input
                        type="file"
                        required
                        hidden
                        onChange={handleChange}
                    />
                </Button>
                {typeof (image) === 'string' ? null :

                    image ? `Имя файла: ${image.name}` : null
                }

            </Box>

            <Box m={1}>
                <p>или</p>
            </Box>

            <Box>
                <TextField
                    disabled={!loading}
                    style={{ width: '100%', marginBottom: '15px' }}
                    size="small"
                    label="Кастомная ссылка"
                    type="text"
                    variant={"outlined"}
                    value={customImageUrl}
                    name={"setCustomImageUrl"}
                    onChange={e => setCustomImageUrl(e.target.value)}
                />
            </Box>
        </Box>
    );
};

export default PosterLoad;